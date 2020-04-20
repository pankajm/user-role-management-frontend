import {JetView, plugins} from "webix-jet";
import {roles} from "models/roles";

export default class RolesView extends JetView {
	config() {
		return {
      view:"window",
      close:true,
      head:"Manage Roles",
      position:"center",
      width:700,
      height:500,
      body: {
        rows:[
          {
            cols:[
              {
                view:"text",
                id:"roletext",
                label:"Role", 
                inputAlign:"left", 
                labelAlign:"right"
              },
              {
                view:"button",
                id:"button:addrole", 
                type:"iconButton",
                icon:"plus", 
                label:"Add Role", 
                width:100,
                click: () => {
                  this.saveRole({role : $$('roletext').getValue()});
                }
              }
            ]
          },
          {
            margin:10,
            padding:10,
            cols:[
              {width:50}, 
              {
                view : "datatable",
                id:"rolestable",
                editable: true,
                autoConfig: true,
                select: true,
                scroll: "y",
                fitBiggest:true,
                columns:[
                  {id:"role", header:["Search Roles", {content:"textFilter"}], sort:"text", width:500},
                  {id: "delete", select:true, header:"", template: "<button class='delete_button'>{common.trashIcon()}</button>"}
                ],
                data : roles,
                onClick:{
                  delete_button: function (ev, id){
                    webix.confirm({
                      text:"The Role will be deleted, <br/> Are you sure?",
                      ok:"Yes", cancel:"Cancel",
                      callback:(res) => {
                        if(res){
                          webix.ajax().del('http://localhost:3000/api/roles/'+id).then((data) => {
                            roles.remove(id);
                          })
                        }
                      }
                    })
                  }
                }
              },
              {
                width:50
              },
            ]
          }
        ]
      }
    }
  }

  /** To show window */
  init(view){
    this.on(this.app, "roles:show", () => {   
      view.show();
    })
  }

  saveRole(role){
    webix.ajax().post('http://localhost:3000/api/roles', role)
    .then((data) => {
      roles.add(data.json());
    })
    .fail((xhr) => {
      var response = JSON.parse(xhr.response);
      webix.message({type: 'error', text: response.error.message});
    })
  }
}