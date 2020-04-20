
export function getRoles(){
  return webix.ajax().get('http://localhost:3000/api/roles').then((data) => {
    return JSON.parse(data.text());
  })
}

export const roles = new webix.DataCollection({ 
  data : getRoles()
});


