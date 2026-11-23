"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">My Favorites</h1>
      <div className="text-center py-20 border-2 border-dashed rounded-2xl">
        <p className="text-lg font-semibold text-muted-foreground">
          No favorite equipment yet
        </p>
        <p className="text-sm text-muted-foreground/70">
          Browse equipment and add to favorites.
        </p>
      </div>
    </div>
  );
}
