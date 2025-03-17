import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Utensils, Brain, History, MessageSquare } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-primary-900">
          AI-Powered Food Discovery
        </h1>
        <p className="text-xl text-primary-700 max-w-2xl mx-auto">
          Experience personalized dining recommendations from our partner restaurants, smart ordering, and real-time assistance powered by artificial intelligence.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/restaurants">
            <Button size="lg">Explore Restaurants</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">Sign In</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<Brain className="h-8 w-8 text-sage-700" />}
          title="Smart Recommendations"
          description="Get personalized meal suggestions based on your preferences and past orders"
        />
        <FeatureCard
          icon={<History className="h-8 w-8 text-sage-700" />}
          title="Order History"
          description="Track your orders and quickly reorder your favorite meals"
        />
        <FeatureCard
          icon={<MessageSquare className="h-8 w-8 text-sage-700" />}
          title="AI Chat Assistant"
          description="Get real-time help with menu items and customizations"
        />
        <FeatureCard
          icon={<Utensils className="h-8 w-8 text-sage-700" />}
          title="Dietary Preferences"
          description="Find meals that match your dietary requirements"
        />
      </section>

      <section className="bg-primary-900 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to experience the future of food ordering?</h2>
        <Link to="/login">
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary-900">
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100 hover:border-primary-200 transition-colors">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-primary-900">{title}</h3>
    <p className="text-primary-700">{description}</p>
  </div>
);

export default Home;