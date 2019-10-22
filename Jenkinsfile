#!groovy
/*
  Please note that this pipeline is a good example to be used in a project.
  However, this pipeline should not be used to build and deploy to artifactory.
  
  We can and should use a standard pipeline from the 
  cm-cicd-pipeline library to do build and deploy to artifactory.
*/

//https://bitbucket.fnis.com/projects/CM/repos/cm-cicd-pipeline-library/browse/vars?at=refs%2Fheads%2Fmultikube
@Library('cm-cicd-pipeline-library@multikube') _

// pod label
def label = "pod-${UUID.randomUUID().toString()}-ptr-cucumber"

//Jenkins workspace
def workingdir = ""

//Image for build, other images added later if needed.
def images = [jnlp: "docker.fnis.com/base-jenkins-client:1.0.1",
              jnlpMemLmt: "750Mi",
              jnlpCpuLmt: "600m",
              helm:"docker.fnis.com/epo/base/helm:1.0.19",
              node:"node:10",nodeMemLmt:"4000Mi",nodeCpuLmt:"1500m"]

// APEX Openshift Env
// Apex-ui-sit Openshift Env
/*
def clustername = "apex"
def namespace = "apex"
def tillerNamespace = "${namespace}"
def deployNamespace = "apex-ui-sit"
def helmrepo = "helm-fpapex-virtual"
// */

//While testing and debugging, please use this namespace.
//devOps OpenShift Env
// /*
def clustername = "ifs-dev-ocp"
def namespace = "ifs-dev-ocp"
def tillerNamespace = "${namespace}"
def deployNamespace = "ifs-dev-ocp"
def helmrepo = "helm-grpdigital-virtual"
// */

def selGridName = params.selGridName
def tags = params.tags
def EnvToRunIn = params.EnvToRunIn
def route = ""

properties([
  parameters([
    string(name: 'selGridName', defaultValue: 'ptr-cucumber', description: 'Name of the Selenim Hub, Selenium Route, and Selenium WebDriver Nodes', trim:true),
    string(name: 'tags', defaultValue: '@set1,@set2', description: 'Names of tags to be executed. Multiple tags can be specified separated by comma', trim:true)
  ]),
])

void protractorTest(tag, address){
  stage('protractor'){  
    try {
      //The return value of a shell command is it's exit code unless otherwise instructed.
      //def ptrExitCode = sh "npm run protractor -- --seleniumAddress=http://${route}/wd/hub --env=stable"
      def ptrExitCode = sh "npm run test -- --cucumberOpts.tags=${tag} --seleniumAddress=${address}"
      println "Protractor exited with Exit Code: ${ptrExitCode}"

      //ptr will exit with exit code 0 if all tests pass.
      if (ptrExitCode != null){
        currentBuild.result = "UNSTABLE"
        echo 'BUILD UNSTABLE'
      }
    } catch(e){
      println e
      currentBuild.result = "UNSTABLE"
      echo 'BUILD UNSTABLE'
    }
  }
}

milestone()
try {
  timestamps {

    slaveTemplate = new PodTemplates(clustername, namespace, label, images, workingdir, this)
    echo "Container images: ${images}"
    echo "running agents on node with label ${label}"

    slaveTemplate.BuilderTemplate {
      node(slaveTemplate.podlabel) {

        stage("checkout") {
          milestone()
          checkout scm
        }

        stage('Helm deploy selenium'){
          container('helm') {
            sh "helm repo update"
            println "Cleaning up environment to ensure a sucessful deploy."

            try {
              sh "helm del --purge ${selGridName} --tiller-namespace ${tillerNamespace}"
            } catch(e) {}

            try {
              sh "oc delete route/\$(oc get route | grep ${selGridName} | cut -d \" \" -f 1)"
            } catch(e){}
            
            // Creates a selenium grid based on the HubValues.yaml
            sh """
              helm install ${helmrepo}/selenium \
              --name ${selGridName} \
              --namespace ${namespace} \
              --tiller-namespace ${tillerNamespace} \
              -f ./jenkins/hubValues.yaml
            """
            
            try {
              // Create hub route as a variable to be read by protractor and jenkins file
              try{
                sh "oc expose svc/\$(oc get svc | grep ${selGridName} | cut -d \" \" -f 1 | head -1)"
              } catch(e){}

              // Get the name of the route and store it in the variable route
              route = sh (
                script: "oc get route/${selGridName}-selenium-hub -o=go-template='{{ .spec.host }}'",
                returnStdout: true
              ).trim()

              println "Route name: ${route}"

              //Wait for our grid to become ready to use
              timeout(time: 30, unit: 'SECONDS') {
                waitUntil{
                  def wdStatus = sh(script: "curl ${route}/wd/hub/status -s", returnStdout: true)
                  try {
                    wdStatus = readJSON text: "${wdStatus}"
                  } catch (e){
                    return false
                  }
                  return wdStatus.value.ready
                }
              }
              println "Selenium grid is ready to be used."
              sh "curl ${route}/wd/hub/status -s"
            } catch (err){
              println err
              container('helm') {
                println 'Cleaning up selenium grid due to early error detected.'
                try{
                  sh "helm del --purge ${selGridName} --tiller-namespace ${tillerNamespace}"
                  sh "oc delete route/\$(oc get route | grep ${selGridName} | cut -d \" \" -f 1)"
                } catch(e){}
              }
            }
          }
        }// end of helm deploy selenium stage

        try {
          // run protractor scripts   
          container('node'){
            stage ('Run Protractor Tests'){
              sh 'npm -v && node -v'
              sh 'npm install'
              sh 'npm run tsc'

              def scripts = [:]
              tags.split(',').eachWithIndex { tag, i ->
                  def setValue = i+1;
                  scripts["set${setValue}"] = {protractorTest("${tag}", "http://${route}/wd/hub")}
              }

              parallel scripts
            }

            stage('Compiling Results'){
                try { 
                  println 'Compiling result'
                  def ptrExitCode = sh "npm run generateReport"
                  println ptrExitCode
                  //sh 'node compileResults.js'
                  } catch (e) {
                  echo e
                }
              
            }
          }

          stage('Archive Reports'){
            container("node"){
              try { 
                // create a timestamp for the Reports folder so each build can be specified as unique
                def timestamp = sh script:'date +%Y%m%d-%H%M%S', returnStdout: true
                zip archive: true, dir: 'Reports', glob: '', zipFile: "Reports-${timestamp}.zip"
              } catch (e) {
                echo e
              }
            } // end of node container
          } // end of Prepare Results stage

        } catch (error) {
          println error
          currentBuild.result = "FAILED"
          echo 'BUILD FAILED - cleaning up the selenium grid'
        } finally {
          stage('Helm clean-up selenium'){
            container('helm') {
              try{
                sh "helm del --purge ${selGridName} --tiller-namespace ${tillerNamespace}"
                sh "oc delete route/\$(oc get route | grep ${selGridName} | cut -d \" \" -f 1)"
              } catch(e){}
            }
          }
        }
        
      }
    }

  }
} catch (e) {
  currentBuild.result = "FAILED"
  echo 'BUILD FAILED'
  throw e
} finally {
      buildNotification {
      emailId = 'Muthupandiyaraja.Balasubramanian@fisglobal.com'
    }
}