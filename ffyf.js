      var processItems = function(i){
                   if( i < catlen ) {



                         $http.post('/postcart'+poscartt).success( function(res) {

                             processItems(i+1);
                           
                             console.log(res);
                         })

                }//for
              };

processItems(0);