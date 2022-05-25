# Point Tracker
## Instructions
TODO
## Description
This is a point tracker application meant to simulate a loyalty rewards application. Users can add transactions into the system to update payer balances. They can also spend points from their pool of total points. For the purposes of this project, I decided to display the responses from the server as JSON on the frontend, so the user can clearly see what is being sent from the backend.
## Technologies
This application utilizes the following technologies:
- PostgreSQL
- Sequelize
- Express
- Express-Validator
- React
- Redux
## Implementation
The trickiest challenge I encountered while building this app was creating the logic for the 'spend points' route. This is because the oldest points need to be spent before any newer points are spent, but looking at a single transaction that earned a user points, one cannot necessarily tell how many of those points are still remaining. Because transactions are not necessarily entered into the system in order, I needed to first query the database for all transactions and order them by timestamp, oldest to newest. Then, I had to iterate through the transactions, keeping track of the point amounts and accurately updating those amounts based on subsequent transactions in which those points were spent. To achieve this, I ended up creating an object with payer names as keys and arrays containing the places in the overall order of transactions where points were added to those payer accounts. Simultaneously, I created an object with integer keys that represented different 'rounds' of transactions. A 'round' is when points are added to a payer balance. The value associated with each 'round' key is another object that holds integer keys that correspond to specific places in the overall order of the transactions. The values associated with these 'order' keys are the point amounts remaining from the their respective transactions. These amounts are updated as the object gets built. Finally, I used these objects as a guide for updating payer balances as points are spent from a user's pool of total points.
![points-1](https://user-images.githubusercontent.com/88861592/170299313-9a94962a-e539-43b4-80f1-16fddcd8c421.PNG)
![points-2](https://user-images.githubusercontent.com/88861592/170299416-0284625b-5e6b-4ecf-8efe-51500bdce1cf.PNG)
![points-3](https://user-images.githubusercontent.com/88861592/170299489-1045f40e-724c-4acc-9c58-bf46a1f4df20.PNG)
![points-4](https://user-images.githubusercontent.com/88861592/170299560-8684709d-61f2-4fe2-b8d5-452e813217e0.PNG)
## Screenshots
![points-5](https://user-images.githubusercontent.com/88861592/170304193-2bead6b7-1927-4406-981b-ec551e9d6697.PNG)
![points-6](https://user-images.githubusercontent.com/88861592/170304255-afcaad45-f716-4acc-b464-fb0e1ea2d82e.PNG)
![points-7](https://user-images.githubusercontent.com/88861592/170304328-2971c65e-9d9b-4884-a0be-e7a57ce3e973.PNG)
![points-8](https://user-images.githubusercontent.com/88861592/170304405-35ca9066-fbde-4a40-bdec-f4e9a71adc5d.PNG)
## Possible future features
In the future, I might add the ability to delete a transaction, or undo the last spend of points.
