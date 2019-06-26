# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index unique：true|

### Association
- has_many: mambers
- has_many: group through: :members
- has_many: messages


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|

### Association
- has_many: messages
- has_many: members
- has_many: users through: :members


## members_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association 
- belong_to: user
- belong_to: group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association 
- belong_to: user
- belong_to: group











