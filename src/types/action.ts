export type Actions = {
	file: File; // Changed from any to File for better type safety
	file_name: string;
	file_size: number;
	from: string;
	to: string | null;
	file_type: string;
	is_converting?: boolean;
	is_converted?: boolean;
	is_error?: boolean;
	url?: string;
	output?: string; // Changed from any to unknown for better type safety
}