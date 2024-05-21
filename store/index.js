import { createContext, useContext, useMemo, useReducer } from "react";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const MyContext = createContext()
MyContext.displayName = "abc"
//Dinh nghia Reducer
const reducer = (state, action) =>{
    switch ( action.type ) {
        case "USER_LOGIN":
            return {...state, userLogin: action.value}
        case "USER_LOGOUT":
            return {...state, userLogin: null}
        default:
            return new Error("Action not found")
            
    }
}

//Dinh nghia MyConTextControllerProvider
const MyConTextControllerProvider = ( {children} ) =>{
    //Khoi store
    const initialState = {
        userLogin: null,
        services: [],
    }
    const [controller, dispatch] = useReducer(reducer, initialState)

    // phan biet useEffect vs useMemo
    const value = useMemo(() =>[controller, dispatch],[controller, dispatch] )
    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )

}

//Dinh nghia useMyContextController
const useMyContextController = () =>{
    const context = useContext(MyContext)
    if (!context) {
        throw new Error (
            "useMyContextController should be use inside the MyContextControllerProvider."
        );
    }
    return context
}

const USERS = firestore().collection("USERS");
const SERVICES = firestore().collection("SERVICES");

const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email, password)
    .then(
        response => USERS.doc(email)
        .onSnapshot(u => dispatch({type: "USER_LOGIN", value: u.data()}))
    )
    .catch(e => Alert.alert("sai email va password"));
}

const logout = (dispatch) => {
    auth().signOut()
    .then(() => dispatch({type: "LOG_OUT", value: null}));
}
const createNewService = (newService) => {
    newService.finalUpdate = firestore.FieldValue.serverTimestamp()
    SERVICES.add(newService)
    .then(() => alert("Add new service"))
    .catch((e) => alert(e))

}
const deleteService = (serviceId) => {
    SERVICES.doc(serviceId).delete()
        .then(() => Alert.alert("Delete service sucessfully"))
        .catch((e) => Alert.alert(e))
}
const registerAccount = (userData) => {
    USERS.doc(userData.email).onSnapshot(u => {
      if (!u.exists) {
        auth()
          .createUserWithEmailAndPassword(userData.email, userData.pass)
          .then(() =>
            USERS.doc(userData.email)
              .set(userData)
              .then(() => console.log('Add new customer!')),
          );
      }
    });
  }
export {MyConTextControllerProvider, useMyContextController, login, logout, createNewService, deleteService, registerAccount}