# TravelNodeBackend
/** packages APIs **/
***********************************
1] /packages/
Method : get
variables : none
Description : just for testing
************************************
2] /packages/city
Method : get
variables : none
Description : return all city that have packages (  use it in home )
************************************
3] /packages/city/packages
Method : get
variables : city (destination)
Description : return all packages that the city has ( use it when you enter any city from home)
************************************
4] /packages/search
Method : get
variables : from,to
Description : return all packages that match 'from' and to (  use it in search bar )
************************************
5] /packages/search/from
Method : get
variables : none
Description : return all available cities to use in [from field] (  use it in autocomplete of 'from' )
************************************
6] /packages/search/to
Method : get
variables : none
Description : return all available cities to use in [to field] (  use it in autocomplete of 'to' )
************************************
7] /packages/filter
Method : get
variables : from, to, minPrice, maxPrice, minDays, maxDays, rate
Description : return all available packages after filtering(  use it in filter )
************************************
