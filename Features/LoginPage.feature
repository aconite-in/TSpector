Feature: Running Cucumber with Protractor

    Background:
        Given User is on "HomePage"

    Scenario: Protractor and Cucumber Test
        When User types "Loko" in "UserName" on "HomePage"
        When User clicks "proceedButton" on "HomePage"
        When User types "password" in "Password" on "HomePage"
        When User clicks "proceedButton" on "HomePage"
        Then Validate that "ErrorLabel" has inner text "Invalid credentials Click Trouble signing in? or call us at 1-877-330-4950 for assistance." on "HomePage"

    @Smoke
    Scenario: Protractor and Cucumber Test 2
        When User types "Loko" in "UserName" on "HomePage"
        When User clicks "proceedButton" on "HomePage"
        When User types "password" in "Password" on "HomePage"
        When User clicks "proceedButton" on "HomePage"
        Then Validate that "ErrorLabel" has inner text "Invalid credentials. Click Trouble signing in? or call us at 1-877-330-4950 for assistance." on "HomePage"