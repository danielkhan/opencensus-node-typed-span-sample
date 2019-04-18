import { Span } from "@opencensus/core";

export enum CanonicalType {
  HTTP = 'http',
}

export interface TypedSpan extends Span {
  type: CanonicalType;
  mandatoryAttributes: string[];
}

export interface HTTPClientTypedSpan extends TypedSpan {
  setMethod(method: string): HTTPClientTypedSpan;
  setHost(host: string): HTTPClientTypedSpan;
  setPath(path: string): HTTPClientTypedSpan;
  setStatusCode(statuscode: number): HTTPClientTypedSpan;
  setRoute(route: string): HTTPClientTypedSpan;
  setUserAgent(agent: string): HTTPClientTypedSpan;
  setRequestParameters(parameters: string): HTTPClientTypedSpan;
  setRequestHeaders(headers: string): HTTPClientTypedSpan;
  setResponseHeaders(headers: string): HTTPClientTypedSpan;
}
