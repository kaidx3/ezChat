CREATE TABLE Account (
    AccountID VARCHAR(200) PRIMARY KEY,
    Username VARCHAR(40) NOT NULL,
)

CREATE TABLE Chat (
    ChatID INT IDENTITY(1, 1) PRIMARY KEY,
    ChatName VARCHAR(80) NULL,
    LastMessageSentDate DATETIME NULL,
    DateCreated DATETIME NOT NULL,
)

CREATE TABLE ChatAccount (
    AccountID VARCHAR(200) FOREIGN KEY REFERENCES Account(AccountID) NOT NULL,
    ChatID INT FOREIGN KEY REFERENCES Chat(ChatID) NOT NULL, 
    PRIMARY KEY(AccountID, ChatID),
)

CREATE TABLE Message (
    MessageID INT IDENTITY(1, 1) PRIMARY KEY,
    MessageContent VARCHAR(MAX),
    ChatID INT FOREIGN KEY REFERENCES Chat(ChatID) NOT NULL,
    TimeSent DATETIME NOT NULL,
)