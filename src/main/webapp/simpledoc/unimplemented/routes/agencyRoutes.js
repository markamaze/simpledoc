import React from 'react'
import { Route } from 'react-router-dom'

// import Client from '../component/agency/Client'
// import ClientManager from '../component/agency/ClientManager'
import FormManager from '../component/agency/FormManager'
// import Position from '../component/agency/Position'
// import PositionManager from '../component/agency/PositionManager'
// import Program from '../component/agency/Program'
// import ProgramManager from '../component/agency/ProgramManager'
// import User from '../component/agency/User'
// import UserManager from '../component/agency/UserManager'
import Form from '../component/form/Form'
// import FormSet from '../component/agency/FormSet'



export const primaryRoutes = [
              // 
              // <Route path="/Agency/Program" render={props => (
              //   <ProgramManager  programlist={null}
              //                    programtypelist={null} />
              // )} />
              // <Route path="/Agency/User" render={props => (
              //             <UserManager  userlist={null}
              //                           usertypelist={null} /> )} />
              // <Route path="/Agency/Client" render={props => (
              //   <ClientManager   clientlist={null}
              //                    clienttypelist={null} /> )} />
              // <Route path="/Agency/Position" render={props => (
              //   <PositionManager positionlist={null}
              //                    positiontypelist={null}
              //                    positionsofferedlist={null} /> )} />
              // <Route path="/Agency/Forms" render={props => (
              //             <FormManager  formStore={null}
              //                           formsInProgress={null}
              //                           formBuilderState={null} />) } />
]

export const programRoutes = [
  //   //             <Route  path="/Agency/Program/programs/:programID"
  //   //                     render={props => (
  //   //                       <Program program={} ></Program>)} />

  //   //             <Route  path="/Agency/Program/programtypes/:typeID"
  //   //                     render={props => (
  //   //                       <Form form={}
  //   //                             editingEnabled disableEntry />)} />

]

export const userRoutes = [
  //   //             <Route  path="/Agency/User/users/:userID"
  //   //                     render={props => (
  //   //                       <User user={} ></User>)} />

  //   //             <Route  path="/Agency/User/usertypes/:typeID"
  //   //                     render={props => (
  //   //                       <Form form={}
  //   //                             editingEnabled disableEntry />)} />

]

export const clientRoutes = [
  //   //             <Route  path="/Agency/Client/clients/:clientID"
  //   //                     render={props => (
  //   //                       <Client client={} ></Client>)} />

  //   //             <Route  path="/Agency/Client/types/:typeID"
  //   //                     render={props => (
  //   //                       <Form form={}
  //   //                             editingEnabled disableEntry />)} />

]

export const positionRoutes = [
  //   //             <Route  path="/Agency/Position/positions/:positionID"
  //   //                     render={props => (
  //   //                       <Position position={} ></Position>)} />

  //   //             <Route  path="/Agency/Position/positiontypes/:typeID"
  //   //                     render={props => (
  //   //                       <Form form={}
  //   //                             editingEnabled disableEntry />)} />

  //   //             <Route  path="/Agency/Position/positionsoffered/:positionID"
  //   //                     render={props => (
  //   //                       <List listdata={}
  //   //                             linktoprefix={}
  //   //                             label={} />)} />

]

export const formRoutes = [
  //   //             <Route  path="/Agency/Forms/published/:formID"
  //   //                     render={props => (
  //   //                       <Form form={}
  //   //                             disableEntry />)} >
  //   //                         <Button action={}>Modify</Button> //creates copy into unpublished store and loads it
  //   //                         <Button action={}>Unpublish</Button>  //moves form into unpublished store
  //   //                       </Form>

  // 					<Route  path="/Agency/Forms/published/:formID"
  //                       	render={props =>  <Form form={null} disableEntry >
  //                           						<Button action={null}>Modify</Button>
  //                           						<Button action={null}>Unpublish</Button>
  //                         					</Form>
  //                         				} />

  	//               <Route  path="/Agency/Forms/unpublished/:formID"
  	//                       render={props => 	<Form form={null} editingEnabled disableEntry >
  	//                           					<Button action={(form)=>action.saveForm(form)}>Save</Button>
  	//                           					<Button action={(formID)=>action.publish(formID)}>Publish</Button>
  	//                           					<Button action={null}>Delete</Button>
  	//                         				</Form> } />
  	         //      <Route  path="/Agency/Forms/unpublished/newform"
  	         //              render={props => (
  	         //                <Form form={null}
  	         //                      editingEnabled disableEntry >
  										// <Button action={(form)=>action.saveForm(form)}>Save</Button>
  	         //                		    <Button action={action.publish(formID)}>Publish</Button>
  	         //                			<Button action={}>Delete</Button>
  	         //                </Form>)} />

  //   //             <Route  path="/Agency/Forms/sets/:formID"
  //   //                     render={props => (
  //   //                       <FormSet formset={} />)} />

]
