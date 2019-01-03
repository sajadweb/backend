# Awesome Vesper Project
        
Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
        
To start testing things you can execute following queries:
        
```graphql
# 1. First few users
mutation UserSaveBulkMutation {
  johny: userSave(firstName: "Johny", lastName: "Cage") {
    id
  }
  linda: userSave(firstName: "Linda", lastName: "Cage") {
    id
  }
}

# 2. List users
query UserListQuery {
  users {
    id
    firstName
    lastName
  }
}

# 3. Get user by id
query UserByIdQuery {
  user(id: 1) { # insert user id here
    id
    firstName
    lastName
  }
}

# 4. Save some photos
mutation PhotoSaveBulkMutation {
  johnyFirstPhoto: photoSave(filename: "johny1.jpg", userId: 1) {
    id
  }
  johnySecondPhoto: photoSave(filename: "johny2.jpg", userId: 1) {
    id
  }
  lindaFirstPhoto: photoSave(filename: "linda1.jpg", userId: 2) {
    id
  }
  lindaSecondPhoto: photoSave(filename: "linda2.jpg", userId: 2) {
    id
  }
}

# 5. Get all photos and their authors
query PhotoListWithUserQuery {
  photos {
    id
    filename
    user {
      id
      firstName
      lastName
    }
  }
}

# 6. Get all users and their photos
query UserListWithPhotosQuery {
  users {
    id
    firstName
    lastName
    photos {
      id
      filename
    }
  }
} 
```
