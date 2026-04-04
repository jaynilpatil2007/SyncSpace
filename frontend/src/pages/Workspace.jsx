import Navbar from "../components/Navbar";
import TaskBoard from "../components/TaskBoard";
import NotesEditor from "../components/NotesEditor";

function SparkleBackground() {
  return (
    <>
      <div className="bg-sparkle" />
      <div className="globe-glow" />
    </>
  );
}

export default function Workspace() {
  return (
    <div className="bg-[#212121] min-h-screen flex flex-col relative">
      <SparkleBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-370 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-6">
              
              {/* Left */}
              <div className="min-h-150 lg:h-[calc(100vh-110px)]">
                <TaskBoard />
              </div>

              {/* Right */}
              <div className="min-h-150 lg:h-[calc(100vh-110px)]">
                <NotesEditor />
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}