import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

// Helper class for building query strings, based on non-null properties of a passed in class.
export class QueryStringBuilder {

    // Static method for building query strings, takes in generic type T object and converts and
    // returns a query string based on the non-null properties.
    public static BuildParametersFromSearch<T>(obj: T): URLSearchParams {

        // Returned object.
        const params: URLSearchParams = new URLSearchParams();

        // Build query string params.
        QueryStringBuilder.PopulateSearchParams(params, '', obj);

        return params;
    }

    // Method to actually build the params list by parsing the passed object.
    private static PopulateSearchParams<T>(params: URLSearchParams, key: string, value: any) {

        // If the object is null (or string representation of null), or empty
        // string, then return at this point as there are no properties to process.
        if (value == null || value === 'null' || value.toString().length === 0) {
            return;
        }

        // If the object is an array, each item will need parsed one by one.
        if (value instanceof Array) {
            QueryStringBuilder.PopulateArray(params, key, value);
        } else if (value instanceof Date) {
            // If date, convert to ISO string.
            params.set(key, value.toISOString());
        } else if (value instanceof Object) {
          // If object type, process the query string params from it.
          QueryStringBuilder.PopulateObject(params, key, value);
        } else {
          // Otherwise, set the key and value for the params object.
           params.set(key, value.toString());
        }
    }

    // Method loops through each item in the passed array and gets the querystring params for each item.
    public static PopulateArray<T>(params: URLSearchParams, prefix: string, val: Array<T>) {
      val.forEach(index => {
        const key = prefix + '[' + index + ']';
        const value: any = index;

        // Add to params list.
        QueryStringBuilder.PopulateSearchParams(params, key, value);
      });
    }

    // Process out the query string params for the object passed.
    public static PopulateObject<T>(params: URLSearchParams, prefix: string, val: T) {

        // Reflect the object keys into an array for processing one by one.
        const objectKeys = Object.keys(val) as Array<keyof T>;

        if (prefix) {
            prefix = prefix + '.';
        }

        // Loop through each property getting the key and value (key is property name, value is actual property value).
        for (const objKey of objectKeys) {

            const value = val[objKey];
            const key = prefix + objKey;

            // Add to params list.
            QueryStringBuilder.PopulateSearchParams(params, key, value);
        }
    }
}
