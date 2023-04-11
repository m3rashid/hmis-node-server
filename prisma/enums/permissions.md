### enum PermissionLevel

| Name        | Value | Description |
| ----------- | :---: | :---------: |
| READ        |   1   |     2^0     |
| WRITE       |   2   |     2^1     |
| UPDATE      |   4   |     2^2     |
| DELETE      |   8   |     2^3     |
| BULK_WRITE  |  16   |     2^4     |
| BULK_UPDATE |  32   |     2^5     |
| BULK_DELETE |  64   |     2^6     |

Permission Level is a 8 bit integer
The idea is taken from how linux filesystem handles user permissions (numbers as powers of two as given in the above enum). The final permission is the sum of all its permissions. Ex- If the user has read and update permissions, level is 1+4=5, If the user has read, update and delete permissions, level is 1+4+8=13

The Algorighm to convert a number to its corresponding permission level is as follows:

1. subtract the nearest powers of 2 from the number
2. and keep those powers of two in an array
3. the array now defines the user permissions in decreasing order of authority

<br />

The whole system works as :
- The app defines all the resources
- The app defines all the permission level for each resource (read, write, update, delete, bulk_write, bulk_update, bulk_delete)
- Permissions (as stated in the app) defines the permission level for each resource
- Permissions include resourceId and permissionLevel
- The admin now creates a role
- A role consists of a name and array of Permissions defining the scope of this role
- Now the admin creates users and assign a single role to them 
