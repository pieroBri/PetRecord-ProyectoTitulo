import { ListaFranquicias } from '../components/ListaFranquicias'
import { AsideDueno, NaviDueno } from '../components/Navi'

export function Franquicias() {
  return (
  <div className='flex min-w-full'>
    
    <AsideDueno/>

    

    <NaviDueno/>

    <div className="max-w-screen-xl mx-auto px-5 text-black bg-white min-h-sceen">
    	<div className="max-w-xl mx-auto mt-8">
    		<div className="py-5">
    			<details className="group">
    				<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
    					<span> What is a SAAS platform?</span>
    					<span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
              </span>
    				</summary>
    				<p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
    					 SAAS platform is a cloud-based software service that allows users to access
    					and use a variety of tools and functionality.
    				</p>
            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
    					 SAAS platform is a cloud-based software service that allows users to access
    					and use a variety of tools and functionality.
    				</p>
            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
    					 SAAS platform is a cloud-based software service that allows users to access
    					and use a variety of tools and functionality.
    				</p>
            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
    					 SAAS platform is a cloud-based software service that allows users to access
    					and use a variety of tools and functionality.
    				</p>
    			</details>
    		</div>
        <div className="py-5">
    			<details className="group">
    				<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
    					<span> What is a SAAS platform?</span>
    					<span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
              </span>
    				</summary>
    				<p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
    					 SAAS platform is a cloud-based software service that allows users to access
    					and use a variety of tools and functionality.
    				</p>
    			</details>
    		</div>
      </div>
    </div>
    {/* <ListaFranquicias/> */}
  </div>
  )
}

