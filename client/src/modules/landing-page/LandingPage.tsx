import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import DogIcon from "../../components/icons/DogIcon";
import PodcastIcon from "../../components/icons/PodcastIcon";
import HandShakeIcon from "../../components/icons/HandShakeIcon";
import AppLayout from "../../components/layouts/AppLayout";

const features = [
  {
    name: "Add your animals",
    description: "You can add your own animals in an easy way.",
    icon: DogIcon,
  },
  {
    name: "Manage your Announcements",
    description:
      "Manage and create your own announcements with ease for your animal lovers.",
    icon: PodcastIcon,
  },
  {
    name: "Adopt animals",
    description: "You can also adopt animals based on your preferences.",
    icon: HandShakeIcon,
  },
  {
    name: "Chat support",
    description:
      "You can contact our support if you have any questions/problems.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
];
const metrics = [
  {
    id: 1,
    stat: "8K+",
    emphasis: "Animals",
    rest: "are adopted everyday from our platform.",
  },
  {
    id: 2,
    stat: "25K+",
    emphasis: "Announcements",
    rest: "were made in our platform.",
  },

  {
    id: 4,
    stat: "12M+",
    emphasis: "Customers",
    rest: "satisfied with our services",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-white">
      <AppLayout>
        <main>
          <div className="relative mt-3">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                <div className="absolute inset-0">
                  <Image
                    className="h-full w-full object-cover"
                    height={2000}
                    width={2000}
                    src="/imgs/dog_owner.jpg"
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
                </div>
                <div className="relative py-16 px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">Our platform</span>
                    <span className="block text-indigo-200">
                      Will take care of your animals.
                    </span>
                  </h1>

                  <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8"
                      >
                        Get started
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                      >
                        Live demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden pt-16 pb-32">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
            />
          </div>

          <div className="relative bg-gradient-to-r from-purple-800 to-indigo-700">
            <div className="absolute left-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#5000ca"
                  fillOpacity="1"
                  d="M0,192L13.3,170.7C26.7,149,53,107,80,106.7C106.7,107,133,149,160,181.3C186.7,213,213,235,240,245.3C266.7,256,293,256,320,224C346.7,192,373,128,400,122.7C426.7,117,453,171,480,186.7C506.7,203,533,181,560,154.7C586.7,128,613,96,640,80C666.7,64,693,64,720,74.7C746.7,85,773,107,800,133.3C826.7,160,853,192,880,192C906.7,192,933,160,960,154.7C986.7,149,1013,171,1040,186.7C1066.7,203,1093,213,1120,234.7C1146.7,256,1173,288,1200,261.3C1226.7,235,1253,149,1280,144C1306.7,139,1333,213,1360,208C1386.7,203,1413,117,1427,74.7L1440,32L1440,320L1426.7,320C1413.3,320,1387,320,1360,320C1333.3,320,1307,320,1280,320C1253.3,320,1227,320,1200,320C1173.3,320,1147,320,1120,320C1093.3,320,1067,320,1040,320C1013.3,320,987,320,960,320C933.3,320,907,320,880,320C853.3,320,827,320,800,320C773.3,320,747,320,720,320C693.3,320,667,320,640,320C613.3,320,587,320,560,320C533.3,320,507,320,480,320C453.3,320,427,320,400,320C373.3,320,347,320,320,320C293.3,320,267,320,240,320C213.3,320,187,320,160,320C133.3,320,107,320,80,320C53.3,320,27,320,13,320L0,320Z"
                ></path>
              </svg>
            </div>
            <div className="mx-auto max-w-4xl py-16 px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
              <div className="flex flex-row gap-3 md:items-center lg:items-center xl:items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                  <SparklesIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <h2 className="text-start text-3xl font-bold tracking-normal text-white">
                  Our Amazing Features
                </h2>
              </div>
              <p className="mt-4 max-w-3xl text-lg text-purple-200">
                Here is what you can do in our platform
              </p>
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-base text-purple-200">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative bg-gray-900">
            <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
              <div className="h-full w-full xl:grid xl:grid-cols-2">
                <div className="h-full xl:relative xl:col-start-2">
                  <Image
                    className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                    height={2000}
                    width={2000}
                    src="/imgs/cats_pic.jpg"
                    alt="People working on laptops"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-4xl px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
              <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                <h2 className="text-base font-semibold">
                  <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    Valuable Metrics
                  </span>
                </h2>
                <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                  Here is a little insight of our platform stats
                </p>
                <p className="mt-5 text-lg text-gray-300">
                  You may find these stats valuable for you to continue using
                  our platform
                </p>
                <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                  {metrics.map((item) => (
                    <p key={item.id}>
                      <span className="block text-2xl font-bold text-white">
                        {item.stat}
                      </span>
                      <span className="mt-1 block text-base text-gray-300">
                        <span className="font-medium text-white">
                          {item.emphasis}
                        </span>{" "}
                        {item.rest}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white">
            <div className="mx-auto max-w-4xl py-16 px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to get started?</span>
                <span className="-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent">
                  Get in touch or create an account.
                </span>
              </h2>
              <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                >
                  Learn more
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-3 text-base font-medium text-indigo-800 shadow-sm hover:bg-indigo-100"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </main>
      </AppLayout>
    </div>
  );
}
