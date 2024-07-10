export const RememberMe = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input id="remember" aria-describedby="remember" type="checkbox" className="" />
        </div>
        <div className="ml-3 text-sm">
          <label className="text-gray-500 dark:text-gray-300">Remember me</label>
        </div>
      </div>
      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
        Forgot password?
      </a>
    </div>
  );
};

