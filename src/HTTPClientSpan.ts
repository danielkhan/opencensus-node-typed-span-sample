import { Span } from '@opencensus/core/build/src/trace/model/span';
import { SpanKind } from '@opencensus/core';

import { HTTPClientTypedSpan, CanonicalType } from './types';
import { isArray } from 'util';

export class HTTPClientSpan extends Span implements HTTPClientTypedSpan {

  type: CanonicalType = CanonicalType.HTTP
  kind: SpanKind = SpanKind.CLIENT;

  // OPTIONAL / PROPOSAL should we check / enforce that mandatory attributes are set
  mandatoryAttributes: string[] = ['http.method', 'http.host', 'http.path'];

  setMethod(method: string): HTTPClientTypedSpan {
    this.addAttribute('http.method', method);
    return this;
  }

  setHost(host: string): HTTPClientTypedSpan {
    this.addAttribute('http.host', host);
    return this;
  }

  setPath(path: string): HTTPClientTypedSpan {
    this.addAttribute('http.path', path);
    return this;
  }

  setStatusCode(statuscode: number): HTTPClientTypedSpan {
    this.addAttribute('http.status_code', statuscode);
    return this;
  }

  setRoute(route: string): HTTPClientTypedSpan {
    this.addAttribute('http.route', route);
    return this;
  }

  setUserAgent(agent: string): HTTPClientTypedSpan {
    this.addAttribute('http.user_agent', agent);
    return this;
  }

  setRequestParameters(parameters: string): HTTPClientTypedSpan {
    this.addAttribute('http.request_parameters', parameters);
    return this;
  }

  setRequestHeaders(headers: string): HTTPClientTypedSpan {
    this.addAttribute('http.request_headers', headers);
    return this;
  }

  setResponseHeaders(headers: string): HTTPClientTypedSpan {
    this.addAttribute('http.response_headers', headers);
    return this;
  }

  // OPTIONAL / PROPOSAL: Checks if all attributes are set on end
  end() {
    this.mandatoryAttributes.forEach((attr) => {
      const missingAttributes = [];
      if (!isArray(this.attributes)) {
        missingAttributes.push(attr);
      } else if (isArray(this.attributes) && !this.attributes.includes(attr)) {
        missingAttributes.push(attr);
      }
      if (missingAttributes.length) throw new Error(`Missing attributes ${missingAttributes.join(', ')} on HTTPClientSpan`);
    });
    super.end();
  }
}
