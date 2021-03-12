# ContactManagementPortal
A Contact Management Portal with frontend in Angular and backend in Spring Boot Java.
The portal is used to add, update, edit, delete contact information. 

# Technologies Used
1. JDK 1.8
2. Angular 9
3. Spring Boot 2.4.2
4. PostgreSQL 12.5

# BackEnd Java Folder Structure
The folder structure for java is as shown in the image below :
![image](https://user-images.githubusercontent.com/22868339/110896840-6580d200-8322-11eb-8398-6ae01a64c089.png)

The folder struture is explained as follows :
1. **config:**
  The config package consits of a CORSConfig.java used for cross origin request configuration.  
2. **controller:**
  The controller package consists of a Rest Controller used for creating REST API's.
3. **dto:**
  The dto package includes a ResponseDto to send response data for post requests.
4. **model:**
  The model package includes the entity/bean for contact data.
5. **repository:**
  The repository package includes the JPA repository to execute queries on contact entity.
6. **service:**
  The service package consists of a service class which includes the businnes logic for contact information operations.

# FrontEnd Angular Folder Struture
The folder structure for angular is as shown in the image below :
![image](https://user-images.githubusercontent.com/22868339/110898166-b7c2f280-8324-11eb-99ad-b51c5a2bbea8.png)

The folder struture is explained as follows :
1. **components:**
  This consists of the ui components required for the portal.  
2. **models:**
  The model includes the data model used for the contact data and other common data models.
3. **service:**
  The service consists of a service used for making api calls for the contact information.It also includes common services for handling HTTP requests.
4. **assets:**
  The assets folder consists of the config json for base url for the API calls.
  
# Running The Application
**Pre-Requisites**
1. Install **npm(nodejs)**, **@angular/cli**.
2. Install **JDK 1.8**.
3. Install **VS-Cod**e **(Optional Windows CMD / Linux Terminal can be used)**.
4. Install **Eclipse / Intellij**.
5. Install **PostgreSQL**.

**BackEnd Java**
1. Import/ Open the folder **backend-java/ContactManagement** in **Intellij / Eclipse**.
2. After importing the project, udpate the **application.properties** file under **/resources** with the DB details.
3. Run the **ContactApplication.java file**, to start the backend server.

**FrontEnd Angular**
1. Open the folder **frontend-angular/ContactManagementPortal** in **VS-Code / CMD**.
2. Execute **npm i** in **CMD / VS-Code Terminal** to install dependencies.
3. After the dependencies are installed exectue **ng serve** to run the frontend application.
4. Open browser and hit the url **http://localhost:4200/**.
  
# Working
1. Home Page : 
   Home Page displays all the contacts with active status.

![image](https://user-images.githubusercontent.com/22868339/110900442-bdbad280-8328-11eb-831c-5dfb4e02e981.png)

2. Add Contact :
   When we click on the Add button , a modal is opened to enter details to add the contact.

![image](https://user-images.githubusercontent.com/22868339/110900961-9284b300-8329-11eb-84c8-dbc0e0c72518.png)


   Mandatory fields are marked with * to add the contact. On entering the valid details for all fields , add button gets enabled and on clicking the add button contact details are saved in DB and the list is updated with a success notification.

![image](https://user-images.githubusercontent.com/22868339/110901322-2d7d8d00-832a-11eb-99a0-555effcf6f09.png)

3. Edit Contact : 
   When we click on the Edit icon , a modal is opened to update details of the selected contact.  
   
 ![image](https://user-images.githubusercontent.com/22868339/110901849-f196f780-832a-11eb-98c2-d1f42fab6de1.png)

   On entering the valid details and clicking on the edit button , details are updated in DB and the list is updated with a success notification.
 
 ![image](https://user-images.githubusercontent.com/22868339/110901995-2acf6780-832b-11eb-8db7-e43a95265fdc.png)

4. Delete Contact : 
   When we click on the delete icon,  the selected contact status is updated to inactive and the list is updated with current active contacts with a success notification.
   **(Deleted Ajay Kumar Contact)**.
   
![image](https://user-images.githubusercontent.com/22868339/110902429-e55f6a00-832b-11eb-9924-c5d9c4a63958.png)


  
  
