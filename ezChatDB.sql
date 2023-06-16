CREATE TABLE Account (
    AccountID VARCHAR(200) PRIMARY KEY,
    Username VARCHAR(40) NOT NULL,
)

CREATE TABLE Chat (
    ChatID INT IDENTITY(1, 1) PRIMARY KEY,
    ChatUsernames VARCHAR(MAX) NOT NULL, 
    ChatName VARCHAR(80) NULL,
    LastMessageSentDate DATETIME NULL,
    DateCreated DATETIME NOT NULL,
    LatestEventDate DATETIME NOT NULL,
    LatestMessage VARCHAR(MAX) NOT NULL,
)

CREATE TABLE ChatAccount (
    AccountID VARCHAR(200) FOREIGN KEY REFERENCES Account(AccountID) NOT NULL,
    ChatID INT FOREIGN KEY REFERENCES Chat(ChatID) NOT NULL, 
    PRIMARY KEY(AccountID, ChatID),
)

CREATE TABLE Message (
    MessageID INT IDENTITY(1, 1) PRIMARY KEY,
    AccountID VARCHAR(200) FOREIGN KEY REFERENCES Account(AccountID) NOT NULL,
    AccountUsername VARCHAR(40) NOT NULL,
    MessageContent VARCHAR(MAX),
    ChatID INT FOREIGN KEY REFERENCES Chat(ChatID) NOT NULL,
    TimeSent DATETIME NOT NULL,
)

DROP TABLE Message

SELECT * FROM ChatAccount WHERE ChatID = 20
SELECT * FROM Account
SELECT * FROM Chat
SELECT * FROM Message

DROP TABLE ChatAccount
DROP TABLE Chat

DELETE FROM Chat 
DELETE FROM Account
DELETE FROM Message 
DELETE FROM ChatAccount

SELECT MessageContent, MAX(TimeSent) 'TimeSent' FROM Message
WHERE ChatID = 21
GROUP BY MessageContent, ChatID

insert into Message (MessageContent, ChatID, TimeSent, AccountUsername, AccountID)
VALUES ('reeeeeeeeeeeeeeeeeeeeeeeeeeeee', 9, GETDATE(), 'asdasdawdads', '0uXtFibtEQZxTsy80zCBTzMy9im1')


 