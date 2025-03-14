interface PageProps {
  params: {
    slug: string;
  };
}

export default function LandingPage({ params }: PageProps) {
  const { slug } = params;
  
  const getDisplayText = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-900">
        {getDisplayText(slug)}
      </h1>
    </div>
  );
}
