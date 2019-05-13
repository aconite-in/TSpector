Feature: Running Cucumber with Protractor

    Background:
        Given User is on "LoginPage"

    # Scenario: InValid Login
    #     When User types "muthub1" in "UserName"
    #     When User clicks "ProceedBtn"
    #     When User types "Muthu@2012" in "Password"
    #     When User clicks "ProceedBtn"
    #     When User captures text from "ErrorLabel" as key "LoginError"
    #     Then Validate that user is on "LoginPage"
    #     When User types "#{LoginError}" in "UserName"

    Scenario: Valid Login
        When User types "muthub1" in "UserName"
        When User clicks "ProceedBtn"
        When User types "Muthu@201" in "Password"
        When User clicks "ProceedBtn"
        When User click "ConcurrentLoginYesBtn" if present
        Then Validate that user is on "HomePage"
        When User clicks "JobsMenuLink"
        Then Validate that user is on "UploadFilePage"
        When User selects "Demo AP" from "ApplicationComboBox"
        When User types "C:\Users\E5555287\Abhishek\Maserati-vCard.xml" in "FileUploadInput"
        When User clicks "FileUploadBtn"
        Then Validate that user is on "BatchDetailsPage"
        When User clicks "NextBtn"
        Then Validate that user is on "HoldItemsPage"
        When User clicks "NextBtn"
        Then Validate that user is on "HoldItemsConfirmationPage"
        When User clicks "SubmitBtn"
        Then Validate that user is on "ConfirmSubmitPage"
        When User captures text from "JobIdLabel" as key "JobID"
        When User clicks "LogoutLink"
        Then Validate that user is on "LoginPage"