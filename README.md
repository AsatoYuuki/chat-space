# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|
|group_id|integer|
|name|string|
|password|integer|

### Association
- has_many: group through: :members_group
- has_many: messages
- has_many: mambers

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|
|group_id|integer|
|group_name|string|

### Association
- has_many: messages
- has_many: members through: :members_group
- has_many: members_group

## members_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|
|group_id|integer|

### Association 
- belong_to: members
- belong_to: groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|
|user_id|integer|

### Association 
- belong_to: members_groups











