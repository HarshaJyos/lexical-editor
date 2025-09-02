'use client'
import "../../package/index.css";
import dynamic from 'next/dynamic';

const Read = dynamic(() => import('../../package/Read'), {
  ssr: false, // This disables server-side rendering for the component
});
export default function App() {
  return (
    <Read />
  );
}
