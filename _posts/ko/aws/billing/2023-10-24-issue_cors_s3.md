---
layout: post
title:  "AWS 프리티어에서 VPC 요금이 과금되는 문제"
permalink: /ko/:categories/freetier
date:  2024-03-20 19:31:15
categories: aws billing
excerpt: AWS 프리티어가 지원되는 서비스를 이용하면 별도 요금없이 무료로 이용가능합니다. 하지만 의도치않게 VPC 요금이 과금되는 문제가 발생하였는데 이에 대한 원인을 확인해보았습니다.
thumbnail: /aws/billing/aws-cost-explorer.png
---

## 프리티어를 이용했는데 VPC 요금이 과금되었습니다..

프리티어는 AWS 에서 처음가입한 사용자들을 대상으로 1년간 제공하는 무료서비스입니다.

프리티어가 제공되는 서비스 항목들에 한하여 무료로 AWS를 이용해볼수 있는데요.

해당 [AWS 프리티어 항목 참조](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) 에서 확인하실 수 있습니다.


<br>

![I used following freetier services with aws, ec2, s3, rds](/assets/img/aws/billing/used-freetier-services.jpg)

위의 항목은 제가 이용한 프리티어 서비스들입니다.

총 **EC2, S3, RDS** 세 개의 서비스들을 사용하였습니다.

<br>

![But I was charged a usage fee](/assets/img/aws/billing/freetier-cost.jpg)
![But I was charged a usage fee](/assets/img/aws/billing/freetier-cost-total.jpg)

하지만 의도치않게 VPC 요금이 과금되어있는것을 확인했습니다..

Route53 은 정기적으로 월에 0.5달러씩 과금이 되는것은 알고있었고 나머지 서비스들은 이것저것 테스트해보면서 과금되는 것을 이해하였지만 VPC 요금은 정말 의도치않은 과금이었습니다..

특히 VPC는 각 리전별로 기본 생성되어져있고 별도로 세팅한 기억은 없는데 이상했습니다..

그래서 AWS Support 팀에 메일로 문의를 해보았습니다.

<br>

![Answer for My Support Request to AWS](/assets/img/aws/billing/freetier-support-answer.jpg)


내용을 해석하자면 

> 안녕하세요, AWS 고객지원팀입니다.<br><br>
2024년 2월부터 청구가 진행 중인 Virtual Private Cloud (VPC) 퍼블릭 IPv4 주소 요금에 대해 문의해 주신 것으로 이해됩니다.<br><br>
2024년 2월 1일부로 퍼블릭 IPv4 주소에 관한 가격 정책이 변경됨에 따라 서비스 연결 여부에 관계없이 모든 퍼블릭 IPv4 주소에 대해 시간당 IP당 $0.005의 요금이 부과됩니다. <br><br>EC2 인스턴스와 연결된 퍼블릭 IPv4 주소의 경우, AWS 프리 티어 기간의 사용자에게 월 750시간의 무료 사용량이 제공됩니다.<br><br> 단, 무료 사용량을 초과하는 퍼블릭 IPv4 주소 사용량 또는 이외 서비스에서 사용되는 퍼블릭 IPv4 주소 사용량에 대해서는 별도의 비용이 청구되는 점 참고 부탁드립니다.<br><br>
서비스를 구성할 당시 추가적인 탄력적 IP 주소를 구성하거나, RDS DB 인스턴스에 퍼블릭 IP 주소를 할당하지는 않았는지 검토해 보실 것을 추천드립니다.


생각해보니.. EC2 인스턴스 뿐만 아니라 RDS도 탄력적 IPv4 주소가 부여됩니다.

프리티어는 하나의 IPv4 주소에 한달 750시간의 무료 사용량을 제공하는데 두개의 탄력적 IPv4 주소를 생성할 경우 한달 375시간만 이용할 수 있습니다.

이를 초과하면 시간당 0.005USD 의 요금이 부과되는것이었습니다..

<div class="divide-line"></div>

## 결론

> 프리티어에 대한 AWS의 안내사항이 부족한 것 같습니다.. EC2, RDS 등의 인스턴스 뿐만 아니라 해당 인스턴스들이 사용하는 **탄력적 IPv4** 에 대한 요금도 부과되는 것을 명심하셔야 합니다.<br><br>
그리고 해당 **탄력적 IPv4** 도 한 달에 750시간 제한이 걸려있고 이용개수가 많을수록 해당 시간이 차감속도가 더 빨라집니다. <br><br>
AWS를 공부목적으로 프리티어를 이용하시는 분들이라면 이를 주의하시고 사용하시면 되겠습니다.
