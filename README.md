# TravelNodeBackend
/** packages APIs **/
***********************************
1] /packages/
Method : get
variables : none
Description : just for testing
************************************
2] /packages/recent
Method : get
variables : none
Description : Getback all packages which is added before 2 days (use it in recent button)
************************************
3] /packages/recommended
Method : get
variables : none
Description : Getback all packages which have +4 rate (use it in recommended button)
************************************
4] /packages/city
Method : get
variables : none
Description : return all city that have packages with its information(  use it in home )
************************************
5] /packages/city/packages
Method : get
variables : city (destination)
Description : return all packages that the city has ( use it when you enter any city from home)
************************************
6] /packages/search
Method : get
variables : from,to
Description : return all packages that match 'from' and 'to' (  use it in search bar )
************************************
7] /packages/search/from 
Method : get
variables : none
Description : return all available cities to use in [from field] (  use it in autocomplete of 'from' )
************************************
8] /packages/search/to
Method : get
variables : none
Description : return all available cities to use in [to field] (  use it in autocomplete of 'to' )
************************************
9] /packages/filter
Method : get
variables : from, to, minPrice, maxPrice, minDays, maxDays, rate, [dateFrom,dateTo(from datepicker withtype timestamp but those parameters are optional)]
Description : return all available packages after filtering(  use it in filter )
************************************
10] /packages/favorite
Method : get
variables : user_id
Description : return favorite packages
************************************
10] /packages/favorite/update
Method : get
variables : user_id,package_id
Description : add or remove from favorite
************************************