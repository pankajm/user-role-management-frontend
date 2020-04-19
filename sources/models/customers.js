function getUsers(){
  return webix.ajax().get('http://localhost:3000/api/users').then((data) => {
    return JSON.parse(data.text());
  })
}

export const customers = new webix.DataCollection({ 
  data : getUsers()
});