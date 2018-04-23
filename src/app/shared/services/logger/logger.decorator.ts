export function LogError( ): MethodDecorator {
  return function(target: Function, key: string, descriptor: any) {

    const originalMethod = descriptor.value;

    descriptor.value =  function (...args: any[]) {

      let result: any = null;

      try {
        result = originalMethod.apply(this, args);
      } catch (error) {
        console.error(`Error running ${key} method: ${error.message}`);
      }

      return result;
    };

    return descriptor;
  };
}
