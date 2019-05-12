Feature: Running Cucumber with Protractor

    Background:
        Given User is on "LoginPage"

    Scenario: Valid Login
        When User types "muthub1" in "UserName"
        When User clicks "ProceedBtn"
        When User types "Muthu@201" in "Password"
        When User clicks "ProceedBtn"
        When User clicks "ConcurrentLoginYesBtn" if present
        Then Validate that user is on "HomePage"
        When User clicks "LogoutLink"
        Then Validate that user is on "LoginPage"

# Scenario: Invalid Login
#     When User executes query "test" and store result in key "test"
#     When User types "inhousewestdalewireless" in "UserName"
#     When User clicks "proceedButton"
#     When User types "Abcd1234" in "Password"
#     When User clicks "proceedButton"
#     Then Validate that user is on "HomePage"
#     When User clicks "LogoutLink"