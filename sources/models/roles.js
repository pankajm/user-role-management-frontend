
export function getRoles(){
  return webix.ajax().get('http://localhost:3000/api/roles')
  .then((data) => {
    return JSON.parse(data.text());
  })
  .fail((xhr) => {
    var response = JSON.parse(xhr.response);
    webix.message({type: 'error', text: response.error.message});
  })
}

export const roles = new webix.DataCollection({ 
  data : getRoles()
});


