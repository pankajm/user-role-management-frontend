function getUsers(){
  return webix.ajax().get('http://localhost:3000/api/users')
    .then((data) => {
      return JSON.parse(data.text());
    })
    .fail((xhr) => {
      var response = JSON.parse(xhr.response);
      webix.message({type: 'error', text: response.error.message});
    })
  }

export const customers = new webix.DataCollection({ 
  data : getUsers()
});