Feature: Running Cucumber with Protractor

    Scenario: Protractor and Cucumber Test
        Given User is on "HomePage"
        Then Validate that user is on "HomePage"
        When User types "Loko" in "UserName" on "HomePage"
        When User clicks "proceed" on "HomePage"
        When User types "password" in "Password" on "HomePage"
        When User clicks "proceed" on "HomePage"