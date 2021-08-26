import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/fontawesome-free-solid";

const Subnav = () => {
  const history = useHistory();
  return (
    <nav className="bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                class="inline-block border border-teal-500 text-teal-500 rounded-full px-6 py-2 mr-4"
                onClick={() => history.goBack()}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Back
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Subnav;
