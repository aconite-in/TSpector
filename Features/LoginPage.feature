Feature: Running Cucumber with Protractor

    Background:
        Given User is on "LoginPage"

    Scenario: Invalid Login
        When User executes query "test" and store result in key "test"
        When User types "inhousewestdalewireless" in "UserName"
        When User clicks "proceedButton"
        When User types "Abcd1234" in "Password"
        When User clicks "proceedButton"
        Then Validate that user is on "HomePage"
        When User clicks cell "westdale nonadmin" in "RecentJobs"