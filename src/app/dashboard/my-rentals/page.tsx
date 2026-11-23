"use client";
import { useState, useEffect } from "react";

export default function MyRentalsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">My Rentals</h1>
      <p className="text-muted-foreground">
        Here you can see all your rental bookings.
      </p>

      <div className="border rounded-xl p-6 bg-card text-center py-20">
        <p className="text-muted-foreground">No rentals found yet.</p>
        <a
          href="/equipment"
          className="text-secondary font-semibold hover:underline mt-2 block"
        >
          Browse Equipment
        </a>
      </div>
    </div>
  );
}
