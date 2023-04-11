### enum Dosage

How much in a day

| Name | Value |    Description    |
| ---- | :---: | :---------------: |
| OD   |   0   |    Once Daily     |
| BD   |   1   |    Twice Daily    |
| BDE  |   2   |    Twice Daily    |
| TD   |   3   | Three Times Daily |
| QD   |   4   | Four Times Daily  |
| FD   |   5   | Five Times Daily  |
| HD   |   6   |  Six Times Daily  |
| SD   |   7   | Seven Times Daily |

<br />

Times of day

| Name | Value | Description  |
| ---- | :---: | :----------: |
| BM   |   0   | Before meals |
| AM   |   1   | After meals  |

<br />

How much in a week

| Name | Value |    Description     |
| ---- | :---: | :----------------: |
| OW   |   0   |    Once Weekly     |
| BW   |   1   |    Twice Weekly    |
| TW   |   2   | Three Times Weekly |
| QW   |   3   | Four Times Weekly  |
| FW   |   4   | Five Times Weekly  |
| HW   |   5   |  Six Times Weekly  |
| SW   |   6   | Seven Times Weekly |

Dosage consists of a four digit number:

- First digit is the number of times in a day (if weekly, this is 1)
- Second digit is the time of the dose (before/ after meal)
- Third digit is the number of days of dose in a week (usually 7 if the medicine is to be taken daily)
- Fourth digit is the total duration of the medicine (in days)
