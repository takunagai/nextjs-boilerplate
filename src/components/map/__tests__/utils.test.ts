import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	generateGoogleMapEmbedUrl,
	getMapUrlByAddress,
	getMapUrlByLatLng,
	getMapUrlByQuery,
	type GoogleMapEmbedOptions,
} from "../utils";

const MOCK_API_KEY = "test_api_key_123";
const BASE_URL = "https://www.google.com/maps/embed/v1/place";

describe("Map Utility Functions", () => {
	let originalEnv: NodeJS.ProcessEnv;

	beforeEach(() => {
		// Store original process.env
		originalEnv = { ...process.env };
		// Mock process.env
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = MOCK_API_KEY;
	});

	afterEach(() => {
		// Restore original process.env
		process.env = originalEnv;
		vi.resetModules(); // Reset modules to clear cached env variables if any
	});

	describe("generateGoogleMapEmbedUrl", () => {
		it("uses default values when no options are provided", () => {
			const url = generateGoogleMapEmbedUrl({});
			const params = new URL(url).searchParams;

			expect(url.startsWith(BASE_URL)).toBe(true);
			expect(params.get("key")).toBe(MOCK_API_KEY);
			expect(params.get("language")).toBe("ja");
			expect(params.get("region")).toBe("jp");
			expect(params.get("maptype")).toBe("roadmap");
			expect(params.get("zoom")).toBe("15");
			expect(params.get("center")).toBe("35.6812362,139.7671248"); // Default lat/lng
			expect(params.get("markers")).toBe("color:red|35.6812362,139.7671248"); // Default showMarker = true
			expect(params.has("q")).toBe(false);
		});

		it('uses provided address for the "q" parameter', () => {
			const options: GoogleMapEmbedOptions = { address: "Tokyo Tower" };
			const url = generateGoogleMapEmbedUrl(options);
			const params = new URL(url).searchParams;

			expect(params.get("q")).toBe("Tokyo Tower");
			expect(params.has("center")).toBe(false);
			expect(params.has("markers")).toBe(false);
		});

		it('uses provided lat/lng for "center" and "markers" if showMarker is true', () => {
			const options: GoogleMapEmbedOptions = {
				lat: 34.56,
				lng: 135.78,
				showMarker: true,
			};
			const url = generateGoogleMapEmbedUrl(options);
			const params = new URL(url).searchParams;

			expect(params.get("center")).toBe("34.56,135.78");
			expect(params.get("markers")).toBe("color:red|34.56,135.78");
			expect(params.has("q")).toBe(false);
		});

		it('uses provided lat/lng for "center" and no "markers" if showMarker is false', () => {
			const options: GoogleMapEmbedOptions = {
				lat: 34.56,
				lng: 135.78,
				showMarker: false,
			};
			const url = generateGoogleMapEmbedUrl(options);
			const params = new URL(url).searchParams;

			expect(params.get("center")).toBe("34.56,135.78");
			expect(params.has("markers")).toBe(false);
			expect(params.has("q")).toBe(false);
		});

		it('uses provided query for the "q" parameter', () => {
			const options: GoogleMapEmbedOptions = { query: "ramen near Shibuya" };
			const url = generateGoogleMapEmbedUrl(options);
			const params = new URL(url).searchParams;

			expect(params.get("q")).toBe("ramen near Shibuya");
			expect(params.has("center")).toBe(false);
			expect(params.has("markers")).toBe(false);
		});

		it("prioritizes address over query if both are provided", () => {
			const options: GoogleMapEmbedOptions = {
				address: "Osaka Castle",
				query: "museums in Osaka",
			};
			const url = generateGoogleMapEmbedUrl(options);
			const params = new URL(url).searchParams;

			expect(params.get("q")).toBe("Osaka Castle"); // Address takes precedence
		});

		it("prioritizes address over lat/lng if address is provided", () => {
			const options: GoogleMapEmbedOptions = {
				address: "Kyoto Station",
				lat: 34.985,
				lng: 135.758,
			};
			const url = generateGoogleMapEmbedUrl(options);
			const params = new URL(url).searchParams;
			expect(params.get("q")).toBe("Kyoto Station");
			expect(params.has("center")).toBe(false);
		});

		it("uses custom options for zoom, language, region, mapType", () => {
			const options: GoogleMapEmbedOptions = {
				lat: 35,
				lng: 135, // To avoid 'q' parameter
				zoom: 10,
				language: "en",
				region: "us",
				mapType: "satellite",
			};
			const url = generateGoogleMapEmbedUrl(options);
			const params = new URL(url).searchParams;

			expect(params.get("zoom")).toBe("10");
			expect(params.get("language")).toBe("en");
			expect(params.get("region")).toBe("us");
			expect(params.get("maptype")).toBe("satellite");
		});

		describe("API Key Handling", () => {
			it("includes the API key from process.env", () => {
				const url = generateGoogleMapEmbedUrl({});
				const params = new URL(url).searchParams;
				expect(params.get("key")).toBe(MOCK_API_KEY);
			});

			it("uses an empty string for API key if not set in process.env", () => {
				delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
				// Need to re-import or use a spy/mock for getGoogleMapsApiKey if it caches the key.
				// For this structure, changing process.env and calling the function again should work
				// if getGoogleMapsApiKey is called fresh each time generateGoogleMapEmbedUrl is called.
				// Let's ensure the module is "fresh" for this by resetting if needed,
				// or by directly testing the internal getGoogleMapsApiKey if it were exported.
				// The afterEach vi.resetModules() should handle module cache for subsequent tests,
				// but for within-test changes, direct function calls are best.
				// However, generateGoogleMapEmbedUrl calls getGoogleMapsApiKey internally.

				// To ensure a clean test for this specific case without complex module reloads mid-test:
				// We can temporarily set it to undefined.
				const oldApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
				process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = undefined;

				const url = generateGoogleMapEmbedUrl({});
				const params = new URL(url).searchParams;
				expect(params.get("key")).toBe("");

				process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = oldApiKey; // Restore for other tests in this suite if any
			});

			it("uses an empty string for API key if set to empty string in process.env", () => {
				const oldApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
				process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "";

				const url = generateGoogleMapEmbedUrl({});
				const params = new URL(url).searchParams;
				expect(params.get("key")).toBe("");

				process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = oldApiKey;
			});
		});
	});

	describe("Helper Functions", () => {
		// Spy on generateGoogleMapEmbedUrl to check its arguments
		let generateUrlSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			// It's better to import the module and spy on its exports
			// For this case, as we are in the same module, this might be tricky.
			// Let's assume we can spy on it or re-structure if needed.
			// For now, we'll test the output, which implicitly tests the call.
			// A more direct spy would be:
			// import * as utils from '../utils';
			// generateUrlSpy = vi.spyOn(utils, 'generateGoogleMapEmbedUrl');
			// However, this can be problematic with how vi.mock and module systems work.
			// We will test the behavior by checking the output URL.
		});

		it("getMapUrlByAddress calls generateGoogleMapEmbedUrl with correct parameters", () => {
			const url = getMapUrlByAddress("Kyoto, Japan", 12, "en");
			const params = new URL(url).searchParams;

			expect(url.startsWith(BASE_URL)).toBe(true);
			expect(params.get("q")).toBe("Kyoto, Japan");
			expect(params.get("zoom")).toBe("12");
			expect(params.get("language")).toBe("en");
			expect(params.get("key")).toBe(MOCK_API_KEY);
			// Check other defaults if necessary, e.g., maptype, region
			expect(params.get("maptype")).toBe("roadmap"); // Default from generateGoogleMapEmbedUrl
		});

		it("getMapUrlByLatLng calls generateGoogleMapEmbedUrl with correct parameters and showMarker true", () => {
			const url = getMapUrlByLatLng(35.123, 139.456, 10, "zh-CN");
			const params = new URL(url).searchParams;

			expect(url.startsWith(BASE_URL)).toBe(true);
			expect(params.get("center")).toBe("35.123,139.456");
			expect(params.get("markers")).toBe("color:red|35.123,139.456"); // showMarker: true is default for this helper
			expect(params.get("zoom")).toBe("10");
			expect(params.get("language")).toBe("zh-CN");
			expect(params.get("key")).toBe(MOCK_API_KEY);
		});

		it("getMapUrlByQuery calls generateGoogleMapEmbedUrl with correct parameters", () => {
			const url = getMapUrlByQuery("Italian restaurants", 16, "it");
			const params = new URL(url).searchParams;

			expect(url.startsWith(BASE_URL)).toBe(true);
			expect(params.get("q")).toBe("Italian restaurants");
			expect(params.get("zoom")).toBe("16");
			expect(params.get("language")).toBe("it");
			expect(params.get("key")).toBe(MOCK_API_KEY);
		});
	});
});
