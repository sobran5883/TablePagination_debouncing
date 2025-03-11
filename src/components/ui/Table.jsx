export function Table({ children }) {
    return <table className="w-full border-collapse border border-gray-300">{children}</table>;
  }
  
  export function TableHeader({ children }) {
    return <thead className="bg-gray-200">{children}</thead>;
  }
  
  export function TableRow({ children }) {
    return <tr className="border-b border-gray-300">{children}</tr>;
  }
  
  export function TableHead({ children }) {
    return <th className="p-2 border-r border-gray-300">{children}</th>;
  }
  
  export function TableBody({ children }) {
    return <tbody>{children}</tbody>;
  }
  
  export function TableCell({ children }) {
    return <td className="p-2 border-r border-gray-300">{children}</td>;
  }