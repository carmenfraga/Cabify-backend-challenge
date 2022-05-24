## Problem
At Cabify we love eating! And we love eating out all together!

In the past months, the team has grown a lot! 
So, unfortunately, it's hard to find a place where we can do a reservation for more than 20 people and it's difficult to come to an agreement on which restaurant to book.

If only we had a service that would help us organize all this...

## Solution
  - Develop a service that complies with the requirements provided in the next section.
    - You can choose one of the following languages: Go, Elixir, Ruby, Javascript or Python (tech we use at Cabify!).
    - To store the information you can choose one of the following datastores: MySQL, SQLite, MongoDB, CouchDB, or just store the information in memory.
  - Try to do as many steps as possible. But... if you are not able to do something or you don't know how to do it, don't worry! Just explain to us the issue you found.

## Service Requirements
  - The Lunch Service has to expose the following endpoints with the behaviour defined in their descriptions.

    - `/eaters - POST`

      **Description**: This endpoint will be in charge of creating new eaters in the system. Below you can find an example of the body payload that has to be sent in the request, and after that an example response.  

      **Body payload**:
      ```
      {
        "name": "My Name",
        "email": "email@mail.com"
      }
      ```

      **Response payload**: Empty, with an appropriate response status code.

    - `/eaters - GET`

      **Description**: This endpoint will provide you a list of all the eaters added in the system.
      
      **Response payload**:

      ```
      [
        {
          "name": "Name",
          "email": "email@mail.com"
        },
        {
          "name": "Name 2",
          "email": "email2@mail.com"
        }
      ]
      ```
    
    - `/restaurants - POST`

      **Description**: This endpoint will be in charge of creating new restaurants in the system. Below you can find the body payload that has to be sent in the request, and after that a sample response.

      **Body payload**:
      ```
      {
        "name": "Goiko Grill",
        "adress": "Calle de López de Hoyos, 161"
      }
      ```

      **Response payload**:

      ```
      {
        "message": "created"
      }
      ```

    - `/restaurants - GET`

      **Description**: This endpoint will provide you a list of all the restaurants added in the system.

      **Response payload**:

      ```
      [
        {
          "name": "Goiko Grill",
          "adress": "Calle de López de Hoyos, 161"
        },
        {
          "name": "Five Guys",
          "adress": "Calle Gran Vía, 44"
        }
      ]
      ```

    - `/eaters - DELETE` 
      
      **Description**: This endpoint will remove all the eaters and restaurants registered in the system.

      **Body payload**: No body payload has to be provided.
      
      **Response payload**:

      ```
      {
        "message": "eaters and restaurants removed"
      }
      ```

    - `/create_groups - POST`

      **Description**: This endpoint is the most important one, it will be in charge of creating the different groups.
      
      The requirements for this endpoint are:
        - We cannot create groups with more than 7 people.
        - Each group should have more or less the same amount of people. (+/- 1 person). 
          - Example 1:
            - BAD:
              - Group 1 -> 7 people
              - Group 2 -> 3 people
            - OK:
              - Grupo 1 -> 5 people
              - Grupo 2 -> 5 people
          - Example 2:
            - BAD: 
              - Group 1 -> 6 people
              - Group 2 -> 3 people
            - OK:
              - Group 1 -> 5 people
              - Group 2 -> 4 people
        - Each group will have a leader that will make the reservation.
        - We want to avoid having the same groups/leaders we had the week before.

      **Body payload**: No body payload has to be provided.

      **Response payloads**:

      If the groups haven't been created before, it will respond with the groups created.

      ```
      [
        {
          "leader": "Person2",
          "eaters": ["Person1", "Person2", "Person4"]
          "restaurant": "Goiko Grill" 
        },
        {
          "leader": "Person3",
          "eaters": ["Person3", "Person5", "Person6"]
          "restaurant": "Five Guys" 
        }
      ]
      ```

      If the groups were previously created, it responds with an appropriate HTTP status code in the [400, 499] range and:

      ```
      {
        "message": "groups already created"
      }
      ```

    - `/groups - GET`

      **Description**: This endpoint will return all the groups created by calling the endpoint `/create_groups`. 

      **Response payloads**:

      If groups are created, it will respond with the list of groups:

      ```
      [
        {
          "leader": "Person2",
          "eaters": ["Person1", "Person2", "Person4"]
          "restaurant": "Goiko Grill" 
        },
        {
          "leader": "Person3",
          "eaters": ["Person3", "Person5", "Person6"]
          "restaurant": "Five Guys" 
        }
      ]
      ```

      If the group was not created yet:

      ```
      {
        "message": "group not created yet"
      }
      ```
 
## Nice to have

- We'd **really** appreciate to see some tests. 
  - Unit test
  - Integration test
- If you can think of other easy feature(s) that can be added that can help our problem, feel free to add it and explain us why you added it!
