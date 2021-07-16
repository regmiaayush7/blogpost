class EasyHTTP{
    //Make an Http GET request
    async get(url){
       const response = await fetch(url);
       const resData = await response.json();
       return resData;
    }
    //Make http POST request
    async post(url, data){  
       const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
  
  //Make an HTTP PUT request
  async put(url, data){
    const response = await fetch(url,{
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      return resData;
  }
  
  //Make an http DELETE Request
  async delete(url){
   const reponse = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }, 
      }) ;
      const resData = await 'Resources deleted';
      return resData;
  }
  }
  
  export const http = new EasyHTTP();