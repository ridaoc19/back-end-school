let TUTOR ={
  "type": "POST_TUTOR",
  "users": [
      {
          "firstNames": "Anton",
          "lastName": "apeAnto",
          "phone": "3245435435",
          "email": "azr@azr.es",
          "password": "123dfg",
          "typeuserIdTypeUsers": "3"
      },
      {
          "firstNames": "Pepe",
          "lastName": "apePepe",
          "phone": "87686858",
          "email": "pepe@gmail.com",
          "password": "123dfg",
          "typeuserIdTypeUsers": "3"
      },
      {
          "firstNames": "Lucia",
          "lastName": "apeLuia",
          "phone": "45342009624",
          "email": "lucia@hotmail.com",
          "password": "123dfg",
          "typeuserIdTypeUsers": "3"
      }
  ],
  "students": [
      {
          "firstNames": "maximiliano",
          "lastName": "david",
          "dniStudent": "33464646",
          "birthDate": "12-02-1990",
          "courseIdCourse": "2"
      },
      {
          "firstNames": "juan",
          "lastName": "ocampo",
          "dniStudent": "54665",
          "birthDate": "12-02-1990",
          "courseIdCourse": "1"
      }
  ]
}


let POST_ADMINISTRATIVO = {
  "type": "POST_ADMINISTRATIVO",
  "users":
      {
          "firstNames": "Glenna",
          "lastName": "Reichert",
          "phone": "76495",
          "email": "Chaim_McDermott@dana.io",
          "password": "123dfg",
          "typeuserIdTypeUsers": "1"
      }
}

let POST_SUPERVISOR = {
    "type": "POST_SUPERVISOR",
    "users": 
        {
            "firstNames": "Leanne",
            "lastName": "Graham",
            "phone": "2998",
            "email": "incere@april.biz",
            "password": "14dfg",
            "typeuserIdTypeUsers": "4"
        }
  }


let POST_PRECEPTOR = {
  "type": "POST_PRECEPTOR",
  "users": 
      {
          "firstNames": "Clementina",
          "lastName": "DuBuque",
          "phone": "31428",
          "email": "Rey.Padberg@karina.biz",
          "password": "123dfg",
          "typeuserIdTypeUsers": "2",
          "idCourse": ["1", "5"]
      }
}


let ALGO = {
    type: 'POST_PRECEPTOR',
    users: {
      firstNames: 'Antonio',
      lastName: 'Longo',
      phone: 'estelivi@gmail.com',
      email: '38145345234',
      password: 'Longo'
    }
  }



///////////////////////////////////////NOTIFICACION/////////////////////////////////////////////////

let NOTIFICATION = {   
    "subject": "informando",
    "body": "texto texto texto text",
    "addresseeId": "1",
    "senderId": ["3", "4"],
}




