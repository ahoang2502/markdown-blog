"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "./types/supabase";
import { createClient } from "@supabase/supabase-js";

export async function createSupabaseServerClient() {
	const cookieStore = cookies();

	const supabase = createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
			},
		}
	);

	return supabase;
}

export async function createSupabaseAdmin() {
	const supabase = createClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SERVICE_ROLE!,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		}
	);

	return supabase;
}
