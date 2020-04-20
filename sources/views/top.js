import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{

	config(){
		return {
			rows : [
				{ type:"header",
				  template:"Toolbar",
					view:"toolbar",
					elements: [
						{ view : "label", height:45, label:"User-Role Management System", align:"center"}
					],
					css:"app_header",
					height:50
				},
				{ cols : [
					{width:200},
					{ $subview : true},
					{width:200},

				]},
				{template:"Thank You !", height:40}
			]
		}
	}
}