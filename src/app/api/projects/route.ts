import { NextResponse } from "next/server";
import { getAllProjects, getFeaturedProjects, Project } from "@/data/projects";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    let projectsData: Project[];

    if (featured === "true") {
      projectsData = getFeaturedProjects();
    } else {
      projectsData = getAllProjects();
    }

    return NextResponse.json(projectsData);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
