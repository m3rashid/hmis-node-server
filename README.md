## HMIS

Hospital Management and Informatics systems

<details>
<summary>Feature list (WIP)</summary>
<br>

OPD (OUT Patient Department)

- Come -> Consilt -> Go
- Appointments/ Single Time Interactions
- Discrete History management

<br>

IPD (IN Patient Department)

- Admission -> Discharge -> Followup
- Continuous Patient Journey
- Department Specific
- Operations and surgeries management

<br>

Inventory

1. Consumables
   - Medicines (Tabs, Syrups)
   - Non Medicines (Injections, Dressings, Saline, Gloves, Tape, Pipe, etc...)
2. Non Consumables (Fans, Chairs, Tables, etc...)

<br>

Lab Management

- Scannable Test Reports to generate e-docs or integrate with testing softwares
- Test Reports

<br>

Insights and Analytics

- How your hospital is performing

<br>

Tracking and Behaviour

- Patient Navigation
- Patient Behaviour
- Patient Journey
- Patient Satisfaction

<br>

Payments

- Payment Integration
- Skippable/Configurable Payments

<br>

Hospital Pacakage Creator

- Health Checkups
- Operations and surgeries
- Cost Analysis

<br>

Health Insurance

- Integration with Health Insurance Companies
- Integration with Govt. for Health IDs

<br>

Other Features

- Patient options for nearest hospital selection (tenant based)
</details>

<br>

<details>
<summary>Designations</summary>
<br>

Designation does not implement any permission of its own, it is just a way to label users on the basis of their name in the workplace. Permissions are implemented granuarly and can be assigned to any user.

<br>

Super Admin

- Developer (Can Do Anything): Has Database Access

<br>

Admin (Client/Tenant): Can be multiple

- Create/Modify/Manage Users/Profiles
- Add/Modify user permissions
- Feature to "view as" other auth level

<br>

Doctor

- Read/Create/modify patient records/history
- Consultation + Prescription
- Refer to another doctors

<br>

Receptionist

- Get Patient Reports
- Schedule Appointments
- Check for doctor availability
- Emergency Cases
- Confirm appointments leads by patients

<br>

Pharmacist

- Add/Dispense Medicines
- Check for availability/expiry/stock

<br>

Patient

- Signup + Create/Update Profile
- Quote for appointment

</details>
