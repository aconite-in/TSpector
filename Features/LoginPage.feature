Feature: Running Cucumber with Protractor

    Background:
        Given User is on "LoginPage"

    Scenario: Valid Login
        When User types "muthub1" in "UserName"
        When User clicks "ProceedBtn"
        When User types "Muthu@201" in "Password"
        When User clicks "ProceedBtn"
        When User captures text from "ErrorLabel" as key "LoginError"
        Then Validate that user is on "LoginPage"
        When User types "#{LoginError}" in "UserName"

# Scenario: Valid Login
#     When User types "muthub1" in "UserName"
#     When User clicks "ProceedBtn"
#     When User types "Muthu@201" in "Password"
#     When User clicks "ProceedBtn"
#     When User click "ConcurrentLoginYesBtn" if present
#     Then Validate that user is on "HomePage"
#     When User clicks "LogoutLink"
#     Then Validate that user is on "LoginPage"