"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Search,
  ShieldCheck,
  Clock,
  CreditCard,
  Star,
} from "lucide-react";

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/equipment/recent`);
        const data = await res.json();
        if (Array.isArray(data)) setFeatured(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecent();
  }, []);

  const categories = [
    { name: "Construction", icon: "🚜" },
    { name: "Photography", icon: "📸" },
    { name: "Vehicles", icon: "🚗" },
    { name: "Agriculture", icon: "🌾" },
    { name: "Electronics", icon: "💻" },
    { name: "Event Equipment", icon: "🎪" },
  ];

  const reviews = [
    {
      name: "Rahim Ahmed",
      rating: 5,
      comment:
        "Great service! The equipment was in perfect condition and the owner was very helpful.",
    },
    {
      name: "Karim Hossain",
      rating: 4,
      comment:
        "Smooth booking process. The delivery was on time. Highly recommend EquipShare.",
    },
    {
      name: "Fatima Begum",
      rating: 5,
      comment:
        "I rented a camera for my wedding. The quality was amazing and the price was reasonable.",
    },
    {
      name: "Sajid Khan",
      rating: 5,
      comment:
        "Very secure payment system. I felt safe renting equipment through this platform.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="w-full min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto"
          >
            Rent Equipment Easily, <br />{" "}
            <span className="text-secondary">Share the Benefits</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            EquipShare connects equipment owners with customers. Find the right
            equipment for your project at the best price.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <Link href="/equipment">
              <Button
                size="lg"
                className="bg-primary rounded-full px-8 text-lg"
              >
                Explore Equipment
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-lg border-secondary text-secondary hover:bg-secondary/10"
              >
                Become an Owner
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Equipment
            </h2>
            <p className="text-muted-foreground mt-3">
              Top-rated equipment available for rent right now.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden card-hover flex flex-col h-full group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="p-5 pb-2">
                    <Badge className="w-fit bg-secondary/10 text-secondary hover:bg-secondary/20 mb-2">
                      {item.category}
                    </Badge>
                    <CardTitle className="text-lg line-clamp-1">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 flex-grow space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4 text-secondary" />{" "}
                      {item.location}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      ৳{item.rentalPrice} / {item.rentalType}
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Link href={`/equipment/${item._id}`} className="w-full">
                      <Button className="w-full bg-primary rounded-full">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              Popular Categories
            </h2>
            <p className="text-muted-foreground mt-3">
              Browse equipment by category.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border rounded-2xl p-6 text-center card-hover cursor-pointer hover:border-secondary transition-colors"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose EquipShare?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-secondary" />,
                t: "Affordable Prices",
                d: "Find the best equipment at competitive prices.",
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
                t: "Verified Owners",
                d: "All equipment owners are verified for your safety.",
              },
              {
                icon: <Clock className="h-10 w-10 text-secondary" />,
                t: "Flexible Rentals",
                d: "Rent daily, weekly, or monthly based on your needs.",
              },
              {
                icon: <CreditCard className="h-10 w-10 text-secondary" />,
                t: "Secure Payments",
                d: "Pay securely with Stripe integration.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="p-4 bg-secondary/10 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.t}</h3>
                <p className="text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary">
                    {review.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-sm">{review.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
