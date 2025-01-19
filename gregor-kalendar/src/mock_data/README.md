## Member Teams Request

- Request Example:
```json
    {
        "userEmail": "gregor@cs.ubc.ca"
    }
```
- Response Example: ``memberTeams.json``

- Given a request object of userEmail, the response object gives all the teams the user belongs to.
- This is for the dashboard page that returns all teams that the user belongs in either as a leader or member.

## Create Team Request

- Request Example: ``createTeamRequest.json``
- Response Example: ``createTeam.json``

- For creating a team. 
- The user requesting automatically becomes a leader
  - At the time of creating, they will be the only leader
  - We're not protecting routes at the moment, so someone can make a request with another user email. It's FINE.
- For an OK Response:
  - It returns the object containing ``teamId`` for the team that got created
  - Refer to the ``createTeam.json``
- For an Error Code Responses, it is when:
  - The given userEmail doesn't exists in the Users Table
- Team Name can be duplicate. A pair of Team Name + User Email can also be a duplicate.
- Response object for creating a team that returns the unique ``Teams.Id`` of the newly created team.


### What the backend should probably do...
- Create a row in the Teams Table
  - A unique ``Teams.Id``
  - Set name with the given name
  - Set ``Teams.Leaders`` as ``[<given-userEmail>]``
  - Initialize ``TeamSlots`` with an empty ``slots`` array
- Initialize the ``Users.Leading_Teams`` JSON for the user creating the team
  - Set the ``slots`` attribute in the JSON as an empty array
  - Example of ``Users.Leading_Teams`` JSON is below:

```json
{
    "slots": []
}
```

## Team Request

- Request Example: 
```json
{
    "teamId": 1,
    "userEmail": "kevz21@student.ubc.ca"
}
``` 
- Response Example: ``team.json``.


- This is a request for fetching information for the Team Page.
  - ``schedule`` is the posted schedule and is the same for any user of the team that requests it.
    - If there are no schedule set yet, the ``schedule`` attribute is ``null``.
  - ``availability`` is the requesting user's availability
    - If a leader is requesting it, the ``availability`` attribute is ``null``.
  - ``slots`` is the same for any user of the team that requests it
  - ``teamInfo`` is the same for any user of the team that requests it

