import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About PlantDekho</h1>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                PlantDekho is dedicated to making plant identification and care accessible to everyone.
                Using cutting-edge AI technology, we help plant enthusiasts, gardeners, and curious minds
                instantly identify plants and learn how to care for them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
              <div className="grid gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">1. Capture or Upload</h3>
                  <p className="text-gray-600">
                    Take a photo of any plant using your device's camera or upload an existing image.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">2. AI Analysis</h3>
                  <p className="text-gray-600">
                    Our advanced AI powered by Google's Gemini analyzes the image to identify the plant
                    species and gather relevant information.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">3. Detailed Results</h3>
                  <p className="text-gray-600">
                    Get comprehensive information about the plant, including care instructions,
                    growing conditions, and interesting facts.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology</h2>
              <p className="text-gray-600 mb-4">
                PlantDekho leverages the power of Google's Gemini AI to provide accurate plant
                identification and detailed information. Our platform is built using modern web
                technologies to ensure a fast, responsive, and user-friendly experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                Have questions or suggestions? We'd love to hear from you! Reach out to us at{' '}
                <a
                  href="mailto:contact@plantdekho.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  contact@plantdekho.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 