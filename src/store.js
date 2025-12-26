export const initialStore=()=>{
  return{
    message: null,    
    listAgenda:[],
    selectedAgendaSlug: null,
    contactsInSelectedAgenda: [],
    fullName: null,
    email: null,
    phone: null,
    address: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

      case 'SET_AGENDAS':
      return {
        ...store,
        listAgenda: action.payload
      };

      case 'SET_SELECTED_AGENDA':
      return {
        ...store,
        selectedAgendaSlug: action.payload
      };

      case 'SET_CONTACTS':
      return {
        ...store,
        contactsInSelectedAgenda: action.payload
      };

      case 'SET_FULL_NAME':
      return {
        ...store,
        fullName: action.payload
      };

      case 'SET_EMAIL':
      return {
        ...store,
        email: action.payload
      };

      case 'SET_PHONE':
      return {
        ...store,
        phone: action.payload
      };

      case 'SET_ADDRESS':
      return {
        ...store,
        address: action.payload
      };

    default:
      return store;
      //throw Error('Unknown action.');      
  }    
}
